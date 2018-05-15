<?php

namespace UserBundle\Controller\Manager;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use UserBundle\Entity\User;

class ManagerController extends Controller
{
    /**
     * @Route("/" , name="home")
     * @Method("GET")
     */
    public function indexAction()
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findAll();

        return $this->render('@User/Home/users.html.twig', [
            'users'=>$users
        ]);
    }

    /**
     * @Route("/add" , name="add")
     * @Method("POST")
     */
    public function registerAction(Request $request,UserPasswordEncoderInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();
        $user = new User();

        $user->setFirstname($request->request->get('firstname'));
        $user->setLastname($request->request->get('lastname'));
        $user->setUsername($request->request->get('username'));
        $user->setEmail($request->request->get('email'));


        $user->setCreatedAt(new \DateTime("now"));
        $user->setPassword($encoder->encodePassword($user,$request->request->get('password')));
        $em->persist($user);
        $em->flush();
        return $this->redirectToRoute('home');
    }


    /**
     * @Route("/active/{id}" , name="active")
     * @Method("get")
     */
    public function activeUserAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(User::class);
        $user = $repository->find($id);

        $user->setActive("oui");
        $em->persist($user);
        $em->flush();
        return $this->redirectToRoute('home');

    }

    /**
     * @Route("/delete/{id}" , name="delete")
     * @Method("GET")
     */
    public function deleteUserAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(User::class);
        $user = $repository->find($id);
        $em->remove($user);
        $em->flush();
        return $this->redirectToRoute('home');
    }

    /**
     * @Route("/show/{id}" , name="show")
     * @Method("GET")
     */
    public function showUserAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(User::class);
        $user = $repository->find($id);

        return $this->render('@User/Home/show.html.twig', [
            'user'=>$user
        ]);
    }

    /**
     * @Route("/update/{id}" , name="update")
     * @Method("POST")
     */
    public function updateUserAction(Request $request,$id,UserPasswordEncoderInterface $encoder )
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(User::class);
        $user = $repository->find($id);

        $user->setFirstname($request->request->get('firstname'));
        $user->setLastname($request->request->get('lastname'));
        $user->setUsername($request->request->get('username'));
        $user->setEmail($request->request->get('email'));
        $user->setPassword($encoder->encodePassword($user,$request->request->get('password')));
        $em->flush();
        return $this->render('@User/Home/show.html.twig', [
            'user'=>$user
        ]);
    }
}
