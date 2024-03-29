<?php
declare(strict_types=1);
namespace App\Controller\Outdoor\GreenSpace;

use App\Controller\Core\GenericController;
use App\Document\Outdoor\GreenSpace\Encyclopedia as EncyclopediaDocument;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Encyclopedia extends GenericController
{
    #[
        Route(
            '/outdoor/green-space/encyclopedia/display',
            name: 'outdoor_greenSpace_encyclopedia'
        )
    ]
    public function display(DocumentManager $documentManager): Response
    {
        $plants = iterator_to_array(
            $documentManager
                ->getRepository(EncyclopediaDocument::class)
                ->findOneBy(['type' => 'PLANT'])
                ->getPlants()
        );
        return $this->getRenderResponse('homePage', [
            'plants' => $this->serializer->serialize($plants, 'json'),
        ]);
    }
}
