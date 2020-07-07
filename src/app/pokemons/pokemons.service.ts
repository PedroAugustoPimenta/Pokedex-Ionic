import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
   providedIn: 'root'
})
export class PokemonsService {

   constructor(private http: HttpClient) { }

   async getJSON() {
      let res = await this.http.get("assets/pokemons.json").toPromise()
      return res;
   }
}