import { Component } from '@angular/core';
import { FilterDataEmitterService } from '../../services/filter-data-emitter.service';
import * as config from '../../../../config.json';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FilterDataEmitterService]
})
export class AppComponent {
  title = 'People i';

  public siteConfig: string;

  ngOnInit() {
    this.siteConfig = JSON.stringify(config);
$("#loader-body").show();
 //this.hrLogin();
 //this.lmLogin();
this.empLogin();

  }


  // Dummy logins
  //hr ids 55572 ,56193
  hrLogin() {
    localStorage.setItem('emp_name', '"Mazhar Khan"');
    localStorage.setItem('e_code', '56193');
    localStorage.setItem('client_id', '48');
    localStorage.setItem('e_user_id', '"eyJpdiI6IlN6dzdVMWxubHU1UzBxMytOR096Y0E9PSIsInZhbHVlIjoic25kOW1wMVQ0WjU2MjVDZ2hZajdcL3c9PSIsIm1hYyI6IjU3OWNlNzg1NjA5OTM1MTM0MGFkOGE3MmNiOGNlZjVmOGMzOGJkYjgyODJjNTczZWUzYTFjZmMwZDBhZDZmZTgifQ=="');
    localStorage.setItem('s_u_number', '56193');
    localStorage.setItem('link', 'hrportal');
    localStorage.setItem('token', '"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTgzYmY0YmE2Y2Y5MzY2YzVjOGQyYzMyMWJkZmIwZGExM2RlNjQ2ZDY3ODVmOTY5ZjVjYzBlMWI3ZjA4ZTk5M2ZiYWQyNDcyZDBiN2E1NTUiLCJpYXQiOjE2NTM5MDEyNjgsIm5iZiI6MTY1MzkwMTI2OCwiZXhwIjoxNjg1NDM3MjY4LCJzdWIiOiI1NTU3MiIsInNjb3BlcyI6W119.Tcm8Fi26Jo_zCJUme2z8IwBSF85l3Fjkpzh9eaGBVq92YNR4r7SLQMsN737HGZHta9SlKTVBHieZjcmZWyRsxt_zLwBuGinsF8U7VHKmtzACx7N0XR-vqT7IZBReo1IBM5k1PpkTrQUf0cGmubJQf7lemb1LR71-0M5xg54vyjfPICPDNcFQeWoEIboFpXRSnN3MdngQXxEe35k2qEZxrvd9j7p0yY1aHerBqRecQLBWrEVTQrsiW-CY7VIgWWdQK_hbfiAM79nbPW4tswWP6UywoS7-K15xmlEYn42fGBU_NWLVP4aahUKAYeZjUAp7dLoYvmQtTTzqjvXC9BtY6OKvoXKBW0W1il10m9NVI-mfv3QNNKN9182i5seRYB8pg94caLGdC4GEvVo4Ww4wdDwBVNEUJXhBYZEfvpCq2UtxNUQw76-ijtXBvEdEIpeGLIAa8gGLRwGOeDqMOvS_AUzmKoGLM178bsdQUFVsO5Odyn7A5Jm7jcT3dupvIuWKuA7NGikTDGEYikcYOP5p5hfu0nvHF5Y9uuxQ_JjFzqpjKMHc4oKh1WoNRKVL4GWk00sgy54DhGsVzv2bFbLNyzcfiTNpo4-DS3YS3C2Ftd0RPm_EP5MDOp_WTmfPkxYTV6T3SeFWF_-zlmZnWxWbD9U6vLuLiqwCGQ__3_6JTNk"');

  }
//17762,58480 58443
  lmLogin() {
    localStorage.setItem('emp_name', '"Mazhar Khan"');
    localStorage.setItem('e_code', '58443');
    localStorage.setItem('client_id', '48');
    localStorage.setItem('e_user_id', '"eyJpdiI6IlN6dzdVMWxubHU1UzBxMytOR096Y0E9PSIsInZhbHVlIjoic25kOW1wMVQ0WjU2MjVDZ2hZajdcL3c9PSIsIm1hYyI6IjU3OWNlNzg1NjA5OTM1MTM0MGFkOGE3MmNiOGNlZjVmOGMzOGJkYjgyODJjNTczZWUzYTFjZmMwZDBhZDZmZTgifQ=="');
    localStorage.setItem('s_u_number', '56193');
    localStorage.setItem('link', 'emportal');
    localStorage.setItem('token', '"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTYyYmU3ODkxY2UwNGNhMWU2YTRmNTg2NDVmZjliYjZiOTA3MGM2OGNlY2MxMTRmMzkxMThiNTU5ZWE2YjU1NmYyMDU0ZWVlNzMzMGJhYzAiLCJpYXQiOjE2NTI3ODExNjIsIm5iZiI6MTY1Mjc4MTE2MiwiZXhwIjoxNjg0MzE3MTYyLCJzdWIiOiI1ODQ0MyIsInNjb3BlcyI6W119.D69LTkkPuRbBeSY-xLbBc5vpnJ0AhSfZhiAjBzX8DEuk3MOYdOAm68-UeIemchrHepFpdnRtqjaDmVd6KnsI5EsVqZ_28mA0p6XbdXUlwzTa1eqWdyzzi2AxBn6nyS2kv5iTTADJ9FuZlWmwpEFPoGkWefHQIQu9Ww03TuPPGrDmu2XhnxqZsvrKFAGPy_Gih_JFwN_lSSie-QUCScRsFA69OzTiXrLFtJ6j3E_3a2j-PPiTOAs__Y3EkVXYbkMTBQIGShVdoRBJrXqumwdezxqa7wz872ar3ScYP-YlAqmhXrWhFgR0LlCXZOoxpgMbHx3XxQnxckxF6gFG6gl_uzgwzrQRaPGIJs83wgMUWr7AHRiylnjUa7-fuMAqCbPdtD8DRPTw-Zd032Yhrc9ZWx8KRLCZdBCbTYdNPDVLZioRLjvpprwXiVa-gzBF6xwY80IFmg-bhTi54TnAQOj1CnNDqJIXztDJQ6NKniGUQvmXAC2STnVXyXNGhKry1rfwGmoCd8UqoExBlzOm9IsR1Vhe7zdRV2xIWxZIxubJKlC17qkS_4lRewMla21sx_iPF2ENSSTkVihY8bN4LAs_SxM7GhyAhsdlKErf2OXGJdAW4rCdLSSu0yY2OD399SFV1aG2smMXFUjQHL4r7Ri-NZuKk-pa2rpFRe2J-3mN5_k"');
  }
//58480 ,17275
  empLogin() {
    localStorage.setItem('emp_name', '"Mazhar Khan"');
    localStorage.setItem('e_code', '17275');
    localStorage.setItem('client_id', '48');
    localStorage.setItem('e_user_id', '"eyJpdiI6IlN6dzdVMWxubHU1UzBxMytOR096Y0E9PSIsInZhbHVlIjoic25kOW1wMVQ0WjU2MjVDZ2hZajdcL3c9PSIsIm1hYyI6IjU3OWNlNzg1NjA5OTM1MTM0MGFkOGE3MmNiOGNlZjVmOGMzOGJkYjgyODJjNTczZWUzYTFjZmMwZDBhZDZmZTgifQ=="');
    localStorage.setItem('s_u_number', '56193');
    localStorage.setItem('link', 'emportal');
    localStorage.setItem('token', '"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDEwMTM2ZTI3YzkwYzFlYzdkNjg4MjFlNGM0MzIzNTNhYjdkYmM0MDdkNDE0NTZiZDRmOWRhZGMzYWNjNjIzZTY5Zjg2MTliMGIyNWY3MjMiLCJpYXQiOjE2NTIzNDY0NjEsIm5iZiI6MTY1MjM0NjQ2MSwiZXhwIjoxNjgzODgyNDYxLCJzdWIiOiI1NjE5MyIsInNjb3BlcyI6W119.ib2YKPF4QuWIht3_FBJb98p8FvvMcJFYvKol2tXoOiJCeCz7gPKRmcZdHB9mFA21TqVwG1ADzP_5qQ47Ch5VmiRtJAWdRQ-UKBBoWnjhS_t4BP2s1SWAbzhj85CYbqFeJc2b-SU3PTvPX2P4OWjWVEvaVnILTRaXqrC4dH7fsfPxZfoWUCKMJO5Jy2BHSzpsnTLSWOD_XaqWk7uGoefmcEDcN5Gfg9wmdwu7i_hTqZZE0g3rbz1NQAtoANFOtRIhJ85sLTBKnm2gwo_RsYcc0cl12vvBe512N82oevW0o-YklCaIJLSrbe_Bm-FgGZAcch2K7FEkW5taOA1LUTQVjcps2-AGub2k-TDoPqfCgLfNWLr-NyCSeGn-GCfLUqVmJqPIJ4B7JNgtBP7xSSZcZ8gwen8glnU76Nu0SlgXeptZTmO0t8jDQpjGQm0dzNC_n7wA2zxTxeYGJSHtl5zPE1CVTxTpAu1SqYoZ-giDaLriGqmcFhOD2omBEezMgg4QHXuZeXYE24zyfL3TA_Va1RFEudTQ1q-L9IC1uvBKWxQfhR4z6qXpTkb6-AvaCPCyTCMlMyYUBP09HQJHPqtgCB-tY8TEsyjAyhlrNO5rPj0APEvaPvBo6mWSkP_7TJPQFaPMZOPhp5wbCcZF4sVMigSAwEJO2g1NOPymgbvHuiE"');
  }

}
