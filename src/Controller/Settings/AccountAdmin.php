<?php
declare(strict_types=1);
namespace App\Controller\Settings;

use App\Controller\Core\GenericController;
use App\Document\Home\MenuItem;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class AccountAdmin extends GenericController
{
    #[
        Route(
            '/settings/account/admin/display',
            name: 'settings_account_admin_display'
        )
    ]
    public function display(): Response
    {
        return $this->getRenderResponse('homePage', [
            'menuItem' => MenuItem::ACCOUNT_ADMIN,
        ]);
    }

    #[
        Route(
            '/settings/account/admin/update/password',
            name: 'settings_account_admin_update_password'
        )
    ]
    public function updatePassword(
        Request $request,
        Security $security,
        UserPasswordHasherInterface $passwordHasher,
        DocumentManager $documentManager
    ): Response {
        $passwordChangement = json_decode($request->getContent());
        if (
            !$passwordChangement->actualPassword ||
            !$passwordChangement->newPassword ||
            !$passwordChangement->repeatedNewPassword
        ) {
            return new JsonResponse(
                [
                    'message' => 'Données incorrectes',
                ],
                Response::HTTP_EXPECTATION_FAILED
            );
        }
        if (
            $passwordChangement->newPassword !==
            $passwordChangement->repeatedNewPassword
        ) {
            return new JsonResponse(
                [
                    'message' => 'Le nouveau mot de passe est incorrecte',
                ],
                Response::HTTP_EXPECTATION_FAILED
            );
        }

        $user = $security->getUser();
        if (
            !$passwordHasher->isPasswordValid(
                $user,
                $passwordChangement->actualPassword
            )
        ) {
            return new JsonResponse(
                [
                    'message' => 'Le mot de passe actuel est incorrecte',
                ],
                Response::HTTP_EXPECTATION_FAILED
            );
        }
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $passwordChangement->newPassword
        );
        $user->setPassword($hashedPassword);
        $documentManager->persist($user);
        $documentManager->flush();
        return new JsonResponse([
            'message' => 'Mot de passe changé avec succès',
        ]);
    }
}
