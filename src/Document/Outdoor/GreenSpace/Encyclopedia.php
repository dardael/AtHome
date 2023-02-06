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
    #[MongoDB\Id(type: 'string', strategy: 'UUID')]
    private string $id;
    #[MongoDB\field(type: 'string')]
    private string $type;
    #[MongoDB\EmbedMany(targetDocument: Plant::class)]
    private iterable $elements;

    public function __construct()
    {
        $this->elements = new ArrayCollection();
    }

    public function setElement(Plant $plant): void
    {
        if ($plant->getId()) {
            $updatedElements = [];
            foreach ($this->elements as $element) {
                if ($element->getId() === $plant->getId()) {
                    $updatedElements[] = $plant;
                    continue;
                }
                $updatedElements[] = $element;
            }
            $this->elements = $updatedElements;
            return;
        }
        $this->elements[] = $plant;
    }

    public function removeElement(string $plantId): void
    {
        $this->elements = array_filter(
            iterator_to_array($this->elements),
            fn(Plant $plant)=> $plant->getId() !== $plantId
        );
    }

    public function getElements():iterable
    {
        return iterator_to_array($this->elements);
    }
}
