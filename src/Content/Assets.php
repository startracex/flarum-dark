<?php

/*
 * This file is part of startracex/flarum-dark.
 *
 * Copyright (c) startracex.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Startracex\FlarumDark\Content;

use Flarum\Frontend\Document;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface as Request;
use Startracex\FlarumDark\ID;

class Assets extends \Flarum\Frontend\Content\Assets
{
    /**
     * @param Document $document
     * @param Request $request
     */
    public function __invoke(Document $document, Request $request): void
    {
        $frontend = $this->assets->getName();

        // Ensure that assets are populated and automatically recompiled if in debug mode.
        parent::__invoke($document, $request);

        if ($frontend !== 'forum' && $frontend !== 'admin') {

            foreach ($document->css as $css) {
                $document->head[] = sprintf('<link rel="stylesheet" href="%s" />', $css);
            }

            // Wipe CSS list
            $document->css = [];
            return;
        }

        $nightCss = $this->assets->makeDarkCss();
        $dayCss = $this->assets->makeCss();

        if ($this->config->inDebugMode()) {
            $this->forceCommit([$dayCss, $nightCss]);
        }

        $preference = $this->getThemePreference($request);

        $isAuto = $preference === 'auto';

        if ($preference === 'light' || $isAuto) {
            $document->head[] = $this->generateTag($dayCss->getUrl());
        } else if ($preference === 'dark') {
            $document->head[] = $this->generateTag($nightCss->getUrl());
        }

        $document->payload[ID::$packageID . '.assets.light'] = $dayCss->getUrl();
        $document->payload[ID::$packageID . '.assets.dark'] = $nightCss->getUrl();
    }

    protected function assembleCompilers(?string $locale): array
    {
        return [
            'js' => [$this->assets->makeJs(), $this->assets->makeLocaleJs($locale)],
            'css' => [$this->assets->makeLocaleCss($locale)],
        ];
    }

    /**
     * @param string|null $url
     *
     * @return string
     */
    protected function generateTag(string $url): string
    {

        return sprintf(
            '<link rel="stylesheet" class="theme-mode-link" href="%s" />',
            $url
        );
    }


    /**
     * @param Request $request
     *
     * @return string
     */
    protected function getThemePreference(Request $request): string
    {
        $actor = RequestUtil::getActor($request);

        return ($actor->getPreference(ID::$packageID, 'auto'));
    }
}
