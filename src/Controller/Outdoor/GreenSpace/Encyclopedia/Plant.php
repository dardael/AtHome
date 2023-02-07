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
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\UploadOptions;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Plant extends GenericController
{
    #[Route('/outdoor/green-space/encyclopedia/plant/save')]
    public function save(
        Request $request,
        DocumentManager $documentManager,
    ): Response {
        $plantDocument = new PlantDocument();
        $plantDocument->setId($request->request->get('id') ?? null);
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
        $encyclopedia->setElement($plantDocument);
        $documentManager->persist($encyclopedia);
        $documentManager->flush();
        $photo = $_FILES['photo'] ?? null;
        if($photo) {
            $uploadOptions = new UploadOptions();
            $uploadOptions->metadata = new PhotoMetadata();
            $uploadOptions->metadata->setPlantId($plantDocument->getId());

            $repository = $documentManager->getRepository(
                PlantDocument\Photo::class
            );
            $repository->uploadFromFile(
                $photo['tmp_name'][0]['originFileObj'],
                $photo['name'][0]['originFileObj'],
                $uploadOptions
            );
        }

        return new JsonResponse(['plantId' => $plantDocument->getId()]);
    }

    #[Route('/outdoor/green-space/encyclopedia/plant/delete/{plantId}')]
    public function delete(
        string $plantId,
        DocumentManager $documentManager,
    ): Response {
        $encyclopedia = $documentManager->getRepository(
            Encyclopedia::class)
            ->findOneBy(['type' => 'PLANT']);
        $encyclopedia->removeElement($plantId);
        $documentManager->persist($encyclopedia);
        $documentManager->flush();
        return new JsonResponse(['success' => true]);
    }

    #[Route('/outdoor/green-space/encyclopedia/plant/{plantId}/photo/get')]
    public function getPhoto(
        string $plantId,
        DocumentManager $documentManager,
    ): BinaryFileResponse {
        $repository = $documentManager->getRepository(Photo::class);
        $file = $repository->findOneBy(['metadata.plantId' => $plantId]);
        if(!$file) {
            new BinaryFileResponse('');
        }
        $stream = fopen('tmp/' . $file->getName(), 'w+');
        try {
            $repository->downloadToStream($file->getId(), $stream);
        }
        finally {
                fclose($stream);
            }
        return new BinaryFileResponse('tmp/' . $file->getName());
    }
}
