<?php
declare(strict_types = 1);
namespace App\Document\Outdoor\GreenSpace\Encyclopedia;

use App\Controller\Outdoor\GreenSpace\Encyclopedia\Plant\Size;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Foliage;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Sunshine;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Type;
use App\Document\Outdoor\GreenSpace\Encyclopedia\Plant\Watering;

class Plant
{
private string $name;
private Type $type;
private Foliage $foliage;
private Sunshine $sunshine;
private Watering $watering;
private float $rusticity;
private array $pruningPeriods;
private Size $size;
private string $description;
}
