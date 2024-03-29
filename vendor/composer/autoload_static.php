<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9d206a34b6b091acbc40f0a33606d8ec
{
    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'Core\\' => 5,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Core\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/core',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/api/app',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9d206a34b6b091acbc40f0a33606d8ec::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9d206a34b6b091acbc40f0a33606d8ec::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
