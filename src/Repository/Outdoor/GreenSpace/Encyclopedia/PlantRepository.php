<?php

declare(strict_types=1);

namespace App\Repository\Outdoor\GreenSpace\Encyclopedia;

use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class PlantRepository extends DocumentRepository
{
    public function __construct(
        private DocumentManager $documentManager,
        private EncyclopediaRepository $encyclopediaRepository
    ) {
    }

    public function save(Plant $plant): void
    {
       $encyclopedia = $this->encyclopediaRepository->get();
       $encyclopedia->addElement($plant);
       $this->documentManager->persist($encyclopedia);
       $this->documentManager->flush();
    }
}
