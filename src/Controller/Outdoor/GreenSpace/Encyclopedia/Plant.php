<?php
declare(strict_types = 1);
namespace App\Controller\Outdoor\GreenSpace\Encyclopedia;

use App\Controller\Core\GenericController;
use App\Document\Outdoor\GreenSpace\Encyclopedia;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant as PlantDocument;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Foliage;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Month;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Photo;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\PhotoMetadata;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Size;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Sunshine;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Type;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Unit;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Watering;
use App\Kernel;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\UploadOptions;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

class Plant extends GenericController
{
    #[Route('/outdoor/green-space/encyclopedia/plant/save')]
    public function save(
        Request $request,
        DocumentManager $documentManager,
    ): Response {
        $plantId = $request->request->get('id') ?? null;
        if ($plantId) {
            $plantDocument = $documentManager->getRepository(PlantDocument::class)
                ->find($plantId);
            $plantDocument->setPhoto(null);
        } else {
            $plantDocument = new PlantDocument();
        }
        $size = $request->request->all('size');
        $sizeDocument = new Size();
        $sizeDocument->setMax((float) $size['max']);
        $sizeDocument->setMin((float) $size['min']);
        $sizeDocument->setUnit(Unit::from($size['unit']));
        $plantDocument->setSize($sizeDocument);
        $plantDocument->setName($request->request->get('name'));
        $plantDocument->setScientificName($request->request->get('scientificName'));
        $plantDocument->setDescription($request->request->get('description'));
        $plantDocument->setFoliage(Foliage::from($request->request->get('foliage')));
        $plantDocument->setPruningPeriods(
            array_map(
                fn($pruningPeriod) => Month::from($pruningPeriod),
                $request->request->get('pruningPeriods') ?: []
            )
        );
        $plantDocument->setSunshine(
            Sunshine::from((string) $request->request->get('sunshine'))
        );
        $plantDocument->setWatering(Watering::from((int) $request->request->get('watering')));
        $plantDocument->setRusticity((int) $request->request->get('rusticity'));
        $plantDocument->setType(Type::from($request->request->get('type')));
        $encyclopedia = $documentManager->getRepository(
            Encyclopedia::class)
            ->findOneBy(['type' => 'PLANT']);
        $photo = $_FILES['photo'] ?? null;
        $plantDocument->setEncyclopedia($encyclopedia);
        $encyclopedia->setPlant($plantDocument);
        $documentManager->persist($encyclopedia);
        $documentManager->flush();
        if($photo) {
            $uploadOptions = new UploadOptions();
            $uploadOptions->metadata = new PhotoMetadata();
            $uploadOptions->metadata->setPlantId($plantDocument->getId());

            $repository = $documentManager->getRepository(
                PlantDocument\Photo::class
            );
            $file = $repository->uploadFromFile(
                $photo['tmp_name'][0]['originFileObj'],
                $photo['name'][0]['originFileObj'],
                $uploadOptions
            );
            $plantDocument->setPhoto($file);
            $documentManager->flush();
        }

        return new JsonResponse(['plantId' => $plantDocument->getId()]);
    }

    #[Route('/outdoor/green-space/encyclopedia/plant/delete/{plantId}')]
    public function delete(
        string $plantId,
        DocumentManager $documentManager,
    ): Response {
        $plant = $documentManager->getRepository(
            PlantDocument::class)
            ->find($plantId);
        $documentManager->remove($plant);
        $documentManager->flush();

        return new JsonResponse(['success' => true]);
    }

    #[Route('/outdoor/green-space/encyclopedia/plant/{plantId}/photo/get')]
    public function getPhoto(
        string $plantId,
        DocumentManager $documentManager,
        Kernel $kernel
    ): Response {
        $repository = $documentManager->getRepository(Photo::class);
        $file = $repository->findOneBy(['metadata.plantId' => $plantId]);
        if (!$file) {
            $content = file_get_contents($kernel->getProjectDir() . '/src/Ressources/Images/defaultPlant.png');
            $filename = 'defaultPlant.png';
        } else {
            try {
                $stream = $repository->openDownloadStream($file->getId());
                try {
                    $content = stream_get_contents($stream);
                    $filename = $file->getName();
                } finally {
                    fclose($stream);
                }
            } catch (\Exception $e) {
                $content = file_get_contents($kernel->getProjectDir() . '/src/Ressources/Images/defaultPlant.png');
                $filename = 'defaultPlant.png';
            }
        }
        $response = new Response($content);
        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $filename
        );
        $response->headers->set('Content-Disposition', $disposition);

        return $response;
    }
}
