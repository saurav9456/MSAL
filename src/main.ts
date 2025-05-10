import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { MSALInstanceFactory, getMsalProviders } from './app/auth-config';

async function main() {
  const msalInstance = MSALInstanceFactory();
  await msalInstance.initialize();

  await bootstrapApplication(AppComponent, {
    providers: [...getMsalProviders(msalInstance)],
  });
}

main().catch(err => console.error(err));
