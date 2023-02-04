<?php

declare(strict_types = 1);

namespace App\Controller\Core;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class GenericController extends AbstractController
{
    public function __construct(protected SerializerInterface $serializer)
    {
    }

    protected function getRenderResponse(string $file, array $variables = []): Response
    {
        return $this->render(
            'base/base.html.twig',
            [
                'files' => [$file],
                'variables' => $variables,
            ]
        );
    }

    protected function getDecodedRequest(Request $request):\stdClass
    {
        return json_decode($request->getContent());
    }
}
