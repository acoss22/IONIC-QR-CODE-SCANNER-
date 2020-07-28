import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  qrScan: any;


  constructor(
    private qrScanner: QRScanner,
    private dialogs: Dialogs,
    private platform: Platform,
    public alertController: AlertController) {
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  scanQrCode() {
     this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {

          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";

         this.qrScan = this.qrScanner.scan().subscribe((textFound) => {
          document.getElementsByTagName("body")[0].style.opacity="1";
          this.qrScan.unsubscribe();
          console.log("Text found = " + textFound);
          this.dialogs.alert(textFound);
        }, (err) => {
          console.log(JSON.stringify(err));
        });
      }else if (status.denied){

      }
  });
}

}
