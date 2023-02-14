<?php

declare(strict_types=1);

namespace App\Document\Outdoor\GreenSpace\Encyclopedia;

use App\Document\Outdoor\GreenSpace\Encyclopedia;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Photo;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Size;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Foliage;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Month;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Sunshine;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Type;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Watering;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Serializer\Annotation\Ignore;

#[MongoDB\Document]
class Plant
{
    #[MongoDB\id]
    private $id;
    #[MongoDB\Field(type: 'string')]
    private string $name;
    #[MongoDB\Field(type: 'string')]
    private ?string $scientificName;
    #[MongoDB\Field(type: 'string', enumType: Type::class)]
    private Type $type;
    #[MongoDB\Field(type: 'string', enumType: Foliage::class)]
    private Foliage $foliage;
    #[MongoDB\Field(type: 'string', enumType: Sunshine::class)]
    private Sunshine $sunshine;
    #[MongoDB\Field(type: 'int', enumType: Watering::class)]
    private Watering $watering;
    #[MongoDB\Field(type: 'float')]
    private float $rusticity;
    #[MongoDB\Field(type: 'collection')]
    private iterable $pruningPeriods;
    #[MongoDB\EmbedOne(targetDocument: Size::class)]
    private Size $size;
    #[MongoDB\Field(type: 'string')]
    private string $description;
    #[
        MongoDB\ReferenceOne(
            targetDocument: Photo::class,
            cascade: 'all',
            orphanRemoval: true
        )
    ]
    private ?Photo $photo;
    #[Ignore]
    #[
        MongoDB\ReferenceOne(
            targetDocument: Encyclopedia::class,
            inversedBy: 'plants'
        )
    ]
    private ?Encyclopedia $encyclopedia;

    public function __construct()
    {
    }

    public function getEncyclopedia(): ?Encyclopedia
    {
        return $this->encyclopedia;
    }

    public function setEncyclopedia(?Encyclopedia $encyclopedia): void
    {
        $this->encyclopedia = $encyclopedia;
    }

    public function getPhoto(): ?Photo
    {
        return $this->photo;
    }
    public function setPhoto(?Photo $photo): void
    {
        $this->photo = $photo;
    }
    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getType(): Type
    {
        return $this->type;
    }

    public function setType(Type $type): void
    {
        $this->type = $type;
    }

    public function getFoliage(): Foliage
    {
        return $this->foliage;
    }

    public function setFoliage(Foliage $foliage): void
    {
        $this->foliage = $foliage;
    }

    public function getSunshine(): Sunshine
    {
        return $this->sunshine;
    }

    public function setSunshine(Sunshine $sunshine): void
    {
        $this->sunshine = $sunshine;
    }

    public function getWatering(): Watering
    {
        return $this->watering;
    }

    public function setWatering(Watering $watering): void
    {
        $this->watering = $watering;
    }

    public function getRusticity(): float
    {
        return $this->rusticity;
    }

    public function setRusticity(float $rusticity): void
    {
        $this->rusticity = $rusticity;
    }

    public function getPruningPeriods(): array
    {
        return array_map(
            fn(string $pruningPeriod) => Month::from($pruningPeriod),
            (array) $this->pruningPeriods
        );
    }

    public function setPruningPeriods(array $pruningPeriods): void
    {
        $this->pruningPeriods = array_map(
            fn(Month $pruningPeriod) => $pruningPeriod->value,
            $pruningPeriods
        );
    }

    public function getSize(): Size
    {
        return $this->size;
    }

    public function setSize(Size $size): void
    {
        $this->size = $size;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getScientificName(): ?string
    {
        return $this->scientificName;
    }

    public function setScientificName(?string $scientificName): void
    {
        $this->scientificName = $scientificName;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }
}
