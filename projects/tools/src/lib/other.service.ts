import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = '9741fa7961e65419d5fbbc5ed8371184';
  private districtList: any  = ['colombo', 'gampaha', 'kaluthara', 'kandy', 'matale', 'nuwara eliya',
    'galle', 'matara', 'hanbantota', 'jaffna', 'mannar', 'vavniya', 'mullativu', 'kilinochchi', 'batticaloa', 'ampara',
    'trincomalee', 'kurunegala', 'puttalam', 'anuradhapura', 'polonnaruwa', 'badulla', 'monaragala', 'ratnapura', 'kegalle'];

  private villageLists: any = ['Weragampita', 'Welisara', 'Weligama', 'Wattegama', 'Wattala', 'Vavuniya', 'Valvedditturai', 'Trincomalee'];

  private fruitsList = ['bandakka', 'beans', 'beetroot', 'bittergourd', 'brinjal', 'cabbage', 'carrot', 'chilli', 'cucumber', 'leeks', 'lime', 'mango', 'orange', 'papaw', 'passion_fruit', 'pineapple', 'pumkin', 'raddish'];
  private cropTypeList = ['Fruits', 'Vegetables', 'Grains'];

  private fruitArray = ['lime', 'mango', 'orange', 'papaw', 'passion_fruit', 'pineapple', 'pumkin', 'raddish'];
  private vegetableArray = ['bandakka', 'beans', 'beetroot', 'bittergourd', 'brinjal', 'cabbage', 'carrot', 'chilli', 'cucumber', 'leeks'];

  public getWeather(city) {
    return this.http.get(this.weatherUrl + '?q=' + city + ',LK&appid=' + this.apiKey);
  }

  public getDistrictList() {
    return this.districtList;
  }

  public getVillageList(district) {
    if (district === 'colombo') {
      return ['Colombo' , 'Timbirigasyaya' , 'Slave Island' , 'Pita Kotte' , 'Maharagama' , 'Sri Jayewardenepura Kotte' , 'Homagama' , 'Battaramulla South' , 'Kolonnawa' , 'Kotikawatta' , 'Galkissa' , 'Hanwella Ihala' , 'Moratuwa' , 'Mulleriyawa'];
    }
    if (district === 'gampaha') {
      return ['Welisara', 'Wattala' , 'Negombo' , 'Minuwangoda' , 'Kelaniya' , 'Katunayaka' , 'Kandana' , 'Ja Ela' , 'Gampaha' , 'Goluwapokuna' , 'Hendala' , 'Peliyagoda'];
    }
    if (district === 'kaluthara') {
      return ['Horana', 'Kalutara' , 'Horana South' , 'Beruwala' , 'Panadura' , 'Pallimulla'];
    }
    if (district === 'kandy') {
      return ['Kandy' , 'Wattegama' , 'Kadugannawa' , 'Nekathkumbura'];
    }
    if (district === 'matale') {
      return ['Taralanda', 'Dambulla' , 'Sigiriya'];
    }
    if (district === 'nuwara eliya') {
      return ['Nuwara Eliya' , 'Talawakele' , 'Hatton' , 'Venture Colony'];
    }
    if (district === 'galle') {
      return ['Galle' , 'Hikkaduwa' , 'Mohottiwatta' , 'Horawala Junction' , 'Ambalangoda' , 'Bentota'];
    }
    if (district === 'matara') {
      return ['Matara' , 'Weragampita', 'Weligama' , 'Weragampita'];
    }
    if (district === 'hanbantota') {
      return ['Tangalle' , 'Hambantota'];
    }
    if (district === 'jaffna') {
      return ['Point Pedro' , 'Valvedditturai'];
    }
    if (district === 'mannar') {
      return ['Mannar'];
    }
    if (district === 'vavniya') {
      return ['Vavuniya', 'Tammannekulama'];
    }
    if (district === 'mullativu') {
      return ['Tammannekulama' , 'Tirukkalkudah'];
    }
    if (district === 'kilinochchi') {
      return ['Kilinochchi'];
    }
    if (district === 'batticaloa') {
      return ['Batticaloa' , 'Kalmunai' , 'Kallady' , 'Eravur Town'];
    }
    if (district === 'ampara') {
      return ['Ampara'];
    }
    if (district === 'trincomalee') {
      return ['Valvedditturai', 'Trincomalee', 'Tirukkalkudah'];
    }
    if (district === 'kurunegala') {
      return ['Kurunegala' , 'Kuliyapitiya'];
    }
    if (district === 'puttalam') {
      return ['Puttalam' , 'Chilaw'];
    }
    if (district === 'anuradhapura') {
      return ['Anuradhapura' , 'New Town' , 'Bandara Bulankulama'];
    }
    if (district === 'ratnapura') {
      return ['Ratnapura'];
    }
    if (district === 'kegalle') {

    }
    if (district === 'polonnaruwa') {
      return ['Polonnaruwa' , 'Hingurakgoda'];
    }
    if (district === 'monaragala') {
      return ['Monaragala'];
    }
    if (district === 'badulla') {
      return ['Badulla' , 'Haputale' , 'Kumbalwella'];
    }
  }

    public getCropsList(type) {
    if (type === 'Fruits') {
      return ['lime', 'mango', 'orange', 'papaw', 'passion_fruit', 'pineapple', 'pumkin', 'raddish'];
    }
    if (type === 'Vegetables') {
      return ['bandakka', 'beans', 'beetroot', 'bittergourd', 'brinjal', 'cabbage', 'carrot', 'chilli', 'cucumber', 'leeks'];
    }
    if (type === 'Grains') {
      return [];
    }
  }

  public getCropTypeList() {
    return this.cropTypeList;
  }

  public getHeatIndex(temp, hum) {
    return (-42.379 + 2.04901523 * temp + 10.14333127 * hum - .22475541 * temp * hum - .00683783 * temp * temp) -
      (.05481717 * hum * hum + .00122874 * temp * temp * hum + .00085282 * temp * hum * hum) -
      (.00000199 * temp * temp * hum * hum);
  }

  public getCropType(cropName) {
    if (this.fruitsList.indexOf(cropName) !== -1) {
       return 'Fruits';
    }
    if (this.villageLists.indexOf(cropName) !== -1) {
      return 'Vegetables';
    }
  }

  public getSolidTypeList() {
    return ['Reddish Brown Earths (RBE)', 'Low Humic Gley Soils (LHG)', 'Non Calcic Brown (NCB)', 'Alluvial Soils'];
  }

}
