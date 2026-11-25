import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
try {
  for(const [id,key,index] of [['founder@cosmic','COSMIC_FOUNDER_PASSWORD',0],['rajeev@cosmic','COSMIC_RAJEEV_PASSWORD',1]]) {
    const page=await browser.newPage({viewport:{width:1360,height:900}});
    await page.goto((process.env.COSMIC_TEST_URL || 'http://localhost:8080')+'/login');
    await page.locator('[name=username]').fill(id); await page.locator('[name=password]').fill(process.env[key]);
    await page.locator('.login-sheet__submit').click(); await page.waitForURL('**/board');
    await page.locator('[data-workspace-tab=due-diligence]').click();
    const cards=page.locator('.founder-profile');
    assert.equal(await cards.nth(1-index).getByRole('button',{name:'Edit Profile'}).isVisible(),false);
    await cards.nth(index).getByRole('button',{name:'Edit Profile'}).click();
    const dialog=page.locator('dialog'); await dialog.waitFor({state:'visible'});
    await dialog.locator('[data-add=education]').click();
    await dialog.locator('[name=qualification]').selectOption('Master’s');
    await dialog.locator('[name=status]').selectOption('Drop out');
    await dialog.locator('[data-group=education] fieldset button').click();
    await dialog.locator('[data-add=experience]').click();
    await dialog.locator('[data-group=experience] fieldset button').click();
    await dialog.locator('[data-add=contributions]').click();
    await dialog.locator('[data-group=contributions] fieldset button').click();
    await dialog.getByRole('button',{name:'Save profile'}).click(); await dialog.waitFor({state:'detached'});
    await page.reload(); await page.locator('[data-workspace-tab=documents]').click();
    await page.locator('#documents-panel').waitFor({state:'visible'});
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.locator('[data-workspace-tab=due-diligence]').click();
    await cards.nth(index).getByRole('button',{name:'Edit Profile'}).click();
    await page.screenshot({path:`tmp/profile-${index}-mobile.png`,fullPage:true});
    await page.close();
  }
  console.log('PASS: rendered logins, owner-only edit controls, repeated entries, save/reload, Documents and mobile width.');
} finally {await browser.close();}
