<?php

declare(strict_types = 1);

namespace App\Controller\Core;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class GenericController extends AbstractController
{
    protected function getRenderResponse(string $file, array $variables = []): Response
    {
        return new Response('<div>coucou</div>');
        return $this->render(
            'base/base.html.twig',
            [
                'files' => [$file],
                'variables' => $variables,
            ]
        );
    }
}
