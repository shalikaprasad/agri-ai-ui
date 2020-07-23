import {Crop} from 'projects/administration/src/app/shared/models/Crop';
import {Farmer} from 'projects/administration/src/app/shared/models/Farmer';

export class Project {
  id: number;
  farmer: Farmer;
  farmerName: any;
  farmingType: string;
  cropName: string;
  crop: Crop;
  district: string;
  village: string;
  landSize: number;
  pressure: number;
  humidity: number;
  rainfall: number;
  temperature: number;
  soilStatus: string;
  startDate: string;
  updateDate: string;
  income: number;
  expensive: number;
  isFail: boolean;
  isExpired: boolean;
  reasonFail: string;
  description: string;
  expireDate: Date;
}
