<?php
declare(strict_types = 1);
namespace App\Controller\Outdoor\GreenSpace\Encyclopedia;

use App\Controller\Core\GenericController;
use App\Document\Outdoor\GreenSpace\Encyclopedia;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant as PlantDocument;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Foliage;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Month;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Size;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Sunshine;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Type;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Unit;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Watering;
use Doctrine\ODM\MongoDB\DocumentManager;
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
        $newPlant = $this->getDecodedRequest($request);
        $plantDocument = new PlantDocument();
        $plantDocument->setId($newPlant->id ?? null);
        $size = new Size();
        $size->setMax($newPlant->size->max);
        $size->setMin($newPlant->size->min);
        $size->setUnit(Unit::from($newPlant->size->unit));
        $plantDocument->setSize($size);
        $plantDocument->setName($newPlant->name);
        $plantDocument->setScientificName($newPlant->scientificName);
        $plantDocument->setDescription($newPlant->description);
        $plantDocument->setFoliage(Foliage::from($newPlant->foliage));
        $plantDocument->setPruningPeriods(
            array_map(
                fn($pruningPeriod) => Month::from($pruningPeriod),
                $newPlant->pruningPeriods
            )
        );
        $plantDocument->setSunshine(
            Sunshine::from((string) $newPlant->sunshine)
        );
        $plantDocument->setWatering(Watering::from($newPlant->watering));
        $plantDocument->setRusticity($newPlant->rusticity);
        $plantDocument->setType(Type::from($newPlant->type));
        $encyclopedia = $documentManager->getRepository(
            Encyclopedia::class)
            ->findOneBy(['type' => 'PLANT']);
        $encyclopedia->setElement($plantDocument);
        $documentManager->persist($encyclopedia);
        $documentManager->flush();
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
}
