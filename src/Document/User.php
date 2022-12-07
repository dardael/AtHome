<?php

declare(strict_types=1);
// src/Document/User.php
namespace App\Document;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[MongoDB\Id(type: 'string', strategy: 'UUID')]
    private string $id;
    #[MongoDB\Field(type: 'string')]
    private string $email;
    #[MongoDB\Field(type: 'string')]
    private string $password;
    //#[MongoDB\Field(type: 'string')]
    private string $role = 'ROLE_USER';

    public function getRoles(): array
    {
       return [$this->role];
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function setRole(string $role): void
    {
        $this->role = $role;
    }

}
