<?php

declare(strict_types=1);

namespace App\Document\Outdoor\GreenSpace\Encyclopedia;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document(collection: 'Encyclopedia')]
class Encyclopedia
{
    #[MongoDB\id(type: 'string', strategy: 'UUID')]
    private string $id;

    #[MongoDB\field(type: 'string')]
    private string $type;

    #[MongoDB\EmbedMany(targetDocument: Plant::class)]
    private iterable $elements;

    public function __construct()
    {
        $this->elements = new ArrayCollection();
    }
    public function addElement(Plant $plant): void
    {
        $this->elements[] = $plant;
    }

    public function getElements():iterable
    {
        return $this->elements;
    }
}
