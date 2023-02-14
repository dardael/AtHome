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
    #[
        MongoDB\ReferenceMany(
            targetDocument: Plant::class,
            cascade: 'all',
            orphanRemoval: true,
            mappedBy: 'encyclopedia'
        )
    ]
    private ArrayCollection $plants;

    public function __construct()
    {
        $this->plants = new ArrayCollection();
    }

    public function setPlant(Plant $plant): void
    {
        if ($plant->getId()) {
            $updatedPlants = new ArrayCollection();
            foreach ($this->plants as $currentPlant) {
                if ($currentPlant->getId() === $plant->getId()) {
                    $updatedPlants[] = $plant;
                    continue;
                }
                $updatedPlants[] = $currentPlant;
            }
            $this->plants = $updatedPlants;
            return;
        }
        $this->plants[] = $plant;
    }

    public function getPlants(): ArrayCollection
    {
        return $this->plants;
    }

    public function setPlants(ArrayCollection $plants): void
    {
        $this->plants = $plants;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }
}
