<?php

namespace UserBundle\Controller\Register;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use UserBundle\Entity\User;
use UserBundle\Form\UserType;

class RegisterController extends Controller
{
    /**
     * @Route("/register" , name="register_page")
     * @Method("GET")
     */
    public function indexAction()
    {
        return $this->render('@User\Register\register.html.twig');
    }

    /**
     * @Route("/register" , name="register")
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
        return $this->redirectToRoute('login');
    }

}
