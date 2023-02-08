<?php

declare(strict_types=1);
// src/Document/Outdoor/GreenSpace/Encyclopedia/Plant/Photo.php

namespace App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
#[MongoDB\File(bucketName: 'plantPhoto')]
class Photo
{
    #[MongoDB\Id]
    private $id;

    #[MongoDB\File\Filename]
    private string $name;

    #[MongoDB\File\UploadDate]
    private $uploadDate;

    #[MongoDB\File\Length]
    private int $length;

    #[MongoDB\File\ChunkSize]
    private int $chunkSize;

    #[MongoDB\File\Metadata(targetDocument: PhotoMetadata::class)]
    private PhotoMetadata $metadata;

    public function __construct(){
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getUploadDate()
    {
        return $this->uploadDate;
    }

    public function setUploadDate($uploadDate): void
    {
        $this->uploadDate = $uploadDate;
    }

    public function getLength(): int
    {
        return $this->length;
    }

    public function setLength(int $length): void
    {
        $this->length = $length;
    }

    public function getChunkSize(): int
    {
        return $this->chunkSize;
    }

    public function setChunkSize(int $chunkSize): void
    {
        $this->chunkSize = $chunkSize;
    }

    public function getMetadata(): PhotoMetadata
    {
        return $this->metadata;
    }

    public function setMetadata(PhotoMetadata $metadata): void
    {
        $this->metadata = $metadata;
    }
}
