<?php

namespace Startracex\FlarumDark;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->content(Content\ThemeLink::class)
        ->css(__DIR__ . '/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->content(Content\ThemeLink::class),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\ServiceProvider())
        ->register(AssetsServiceProvider::class),

    (new Extend\User())
        ->registerPreference(ID::$packageID, function ($value) {
            if ($value === '' || $value === null) {
                $value = 'auto';
            }
            return $value;
        }, "auto"),
];
