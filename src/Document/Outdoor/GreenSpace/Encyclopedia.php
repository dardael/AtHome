<?php

declare(strict_types=1);
// src/Document/Outdoor/GreenSpace/Encyclopedia.php

namespace App\Document\Outdoor\GreenSpace;

use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document]
class Encyclopedia
{
    #[MongoDB\Id]
    private $id;
    #[MongoDB\field(type: 'string')]
    private string $type;
    #[MongoDB\ReferenceMany(targetDocument: Plant::class, cascade: 'all', orphanRemoval: true)]
    private iterable $plants;

    public function __construct()
    {
        $this->plants = new ArrayCollection();
    }

    public function setElement(Plant $plant): void
    {
        if ($plant->getId()) {
            $updatedElements = [];
            foreach ($this->plants as $element) {
                if ($element->getId() === $plant->getId()) {
                    $updatedElements[] = $plant;
                    continue;
                }
                $updatedElements[] = $element;
            }
            $this->plants = $updatedElements;
            return;
        }
        $this->plants[] = $plant;
    }

    public function removeElement(string $plantId): void
    {
        $this->plants = array_filter(
            iterator_to_array($this->plants),
            fn(Plant $plant)=> $plant->getId() !== $plantId
        );
    }

    public function getPlants():iterable
    {
        return iterator_to_array($this->plants);
    }

    public function setPlants(iterable $plants): void
    {
        $this->plants = $plants;
    }
}
