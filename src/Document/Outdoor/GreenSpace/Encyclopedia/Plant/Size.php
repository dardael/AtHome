<?php
declare(strict_types=1);
namespace App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\EmbeddedDocument]
class Size
{
    #[MongoDB\id(type: 'string', strategy: 'UUID')]
    private string $id;
    #[MongoDB\Field(type: 'float')]
    private float $min;
    #[MongoDB\Field(type: 'float')]
    private float $max;
    #[MongoDB\Field(type: 'string', enumType: Unit::class)]
    private Unit $unit;

    public function getMin(): float
    {
        return $this->min;
    }

    public function setMin(float $min): void
    {
        $this->min = $min;
    }

    public function getMax(): float
    {
        return $this->max;
    }

    public function setMax(float $max): void
    {
        $this->max = $max;
    }

    public function getUnit(): Unit
    {
        return $this->unit;
    }

    public function setUnit(Unit $unit): void
    {
        $this->unit = $unit;
    }
}
