import Region from "@/models/region.model";
import City from "@/models/city.model";
import PostOffice from "@/models/postOffice.model";

export default async function generateAddress(region_id : number, city_id : number, postOffice_id : number) : Promise<string>{
    if (region_id || city_id || postOffice_id) {
        const region = region_id ? await Region.query().findById(region_id) : null;
        const city = city_id ? await City.query().findById(city_id) : null;
        const postOffice = postOffice_id ? await PostOffice.query().findById(postOffice_id) : null;

        const regionName = region ? region.name : '';
        const cityName = city ? city.name : '';
        const postOfficeName = postOffice ? postOffice.address : '';

        return `${regionName}, ${cityName}, ${postOfficeName}`;
    }
    return ''
}