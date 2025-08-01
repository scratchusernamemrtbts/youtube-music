import prompt from 'custom-electron-prompt';

import { t } from '@/i18n';
import promptOptions from '@/providers/prompt-options';

import type { MenuItemConstructorOptions } from 'electron';
import type { MenuContext } from '@/types/contexts';
import type { SyncedLyricsPluginConfig } from './types';

export const menu = async (
  ctx: MenuContext<SyncedLyricsPluginConfig>,
): Promise<MenuItemConstructorOptions[]> => {
  const config = await ctx.getConfig();

  return [
    {
      label: t('plugins.synced-lyrics.menu.offset.label'),
      toolTip: t('plugins.synced-lyrics.menu.offset.tooltip'),
      type: 'normal',
      async click() {
        const config = await ctx.getConfig();
        const newOffset = await prompt(
          {
            title: t('plugins.synced-lyrics.menu.offset.prompt.title'),
            label: t('plugins.synced-lyrics.menu.offset.prompt.label'),
            value: config.lyricsOffset || 0,
            type: 'input',
            inputAttrs: {
              type: 'number',
              style: 'text-align: center; width: unset;' as unknown as CSSStyleDeclaration,
            },
            width: 380,
            ...promptOptions(),
          },
          ctx.window,
        );
        if (!newOffset) return
        ctx.setConfig({
          lyricsOffset: Number(newOffset) ?? config.lyricsOffset,
        });
      },
    },
    {
      label: t('plugins.synced-lyrics.menu.precise-timing.label'),
      toolTip: t('plugins.synced-lyrics.menu.precise-timing.tooltip'),
      type: 'checkbox',
      checked: config.preciseTiming,
      click(item) {
        ctx.setConfig({
          preciseTiming: item.checked,
        });
      },
    },
    {
      label: t('plugins.synced-lyrics.menu.line-effect.label'),
      toolTip: t('plugins.synced-lyrics.menu.line-effect.tooltip'),
      type: 'submenu',
      submenu: [
        {
          label: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.fancy.label',
          ),
          toolTip: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.fancy.tooltip',
          ),
          type: 'radio',
          checked: config.lineEffect === 'fancy',
          click() {
            ctx.setConfig({
              lineEffect: 'fancy',
            });
          },
        },
        {
          label: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.scale.label',
          ),
          toolTip: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.scale.tooltip',
          ),
          type: 'radio',
          checked: config.lineEffect === 'scale',
          click() {
            ctx.setConfig({
              lineEffect: 'scale',
            });
          },
        },
        {
          label: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.offset.label',
          ),
          toolTip: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.offset.tooltip',
          ),
          type: 'radio',
          checked: config.lineEffect === 'offset',
          click() {
            ctx.setConfig({
              lineEffect: 'offset',
            });
          },
        },
        {
          label: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.focus.label',
          ),
          toolTip: t(
            'plugins.synced-lyrics.menu.line-effect.submenu.focus.tooltip',
          ),
          type: 'radio',
          checked: config.lineEffect === 'focus',
          click() {
            ctx.setConfig({
              lineEffect: 'focus',
            });
          },
        },
      ],
    },
    {
      label: t('plugins.synced-lyrics.menu.default-text-string.label'),
      toolTip: t('plugins.synced-lyrics.menu.default-text-string.tooltip'),
      type: 'submenu',
      submenu: [
        {
          label: '♪',
          type: 'radio',
          checked: config.defaultTextString === '♪',
          click() {
            ctx.setConfig({
              defaultTextString: '♪',
            });
          },
        },
        {
          label: '" "',
          type: 'radio',
          checked: config.defaultTextString === ' ',
          click() {
            ctx.setConfig({
              defaultTextString: ' ',
            });
          },
        },
        {
          label: '...',
          type: 'radio',
          checked: config.defaultTextString === '...',
          click() {
            ctx.setConfig({
              defaultTextString: '...',
            });
          },
        },
        {
          label: '———',
          type: 'radio',
          checked: config.defaultTextString === '———',
          click() {
            ctx.setConfig({
              defaultTextString: '———',
            });
          },
        },
      ],
    },
    {
      label: t('plugins.synced-lyrics.menu.romanization.label'),
      toolTip: t('plugins.synced-lyrics.menu.romanization.tooltip'),
      type: 'checkbox',
      checked: config.romanization,
      click(item) {
        ctx.setConfig({
          romanization: item.checked,
        });
      },
    },
    {
      label: t('plugins.synced-lyrics.menu.show-time-codes.label'),
      toolTip: t('plugins.synced-lyrics.menu.show-time-codes.tooltip'),
      type: 'checkbox',
      checked: config.showTimeCodes,
      click(item) {
        ctx.setConfig({
          showTimeCodes: item.checked,
        });
      },
    },
    {
      label: t('plugins.synced-lyrics.menu.show-lyrics-even-if-inexact.label'),
      toolTip: t(
        'plugins.synced-lyrics.menu.show-lyrics-even-if-inexact.tooltip',
      ),
      type: 'checkbox',
      checked: config.showLyricsEvenIfInexact,
      click(item) {
        ctx.setConfig({
          showLyricsEvenIfInexact: item.checked,
        });
      },
    },
  ];
};
