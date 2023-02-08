<?php
declare(strict_types = 1);
namespace App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\EmbeddedDocument]
class PhotoMetadata
{
    #[MongoDB\id(type: 'string', strategy: 'UUID')]
    private string $id;
    #[MongoDB\Field(type: 'string')]
    private string $plantId;

    public function getPlantId(): string
    {
        return $this->plantId;
    }

    public function setPlantId(string $plantId): void
    {
        $this->plantId = $plantId;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }
}
