<?php

declare(strict_types=1);

namespace App\Repository\Outdoor\GreenSpace\Encyclopedia;

use App\Document\Outdoor\GreenSpace\Encyclopedia\Encyclopedia;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class EncyclopediaRepository extends DocumentRepository
{
    public function __construct(private DocumentManager $documentManager){
    }

    public function get(): Encyclopedia {
        return $this->documentManager->getRepository(Encyclopedia::class)
            ->findOneBy(['type' => 'PLANT']);
    }
}
