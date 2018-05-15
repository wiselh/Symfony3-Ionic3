<?php

namespace UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use UserBundle\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;


class LoadUserData extends Fixture implements FixtureInterface, ContainerAwareInterface
{
    private $container;
    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
       $user = new User();
        $user->setFirstname('admin');
        $user->setLastname('admin');
        $user->setUsername('admin');
        $user->setEmail('admin@admin.com');
        $user->setCreatedAt(new \DateTime('now'));
       $encoder= $this->container->get('security.password_encoder');
       $password= $encoder->encodePassword($user,'0000');
       $user->setPassword($password);
       $manager->persist($user);
       $manager->flush();

    }

    /**
     * Sets the Container.
     *
     * @param ContainerInterface|null $container A ContainerInterface instance or null
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container=$container;
    }
}
