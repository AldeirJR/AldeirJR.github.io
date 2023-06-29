import { Component, OnInit } from '@angular/core';
import { MarvelAPIService } from './Service/marvel-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: MarvelAPIService) { }
  ngOnInit(): void {
    this.showSearchResult = false;
  }

  title = 'marvel_app';
  characterName:any;
  searchedCharacter:any=[];
  showSearchResult: boolean | undefined;
  inputValue:string ='';


  findCharacter(event: any) {
    // this.characterName = event.target.value;
    console.log(this.inputValue);
    this.service.getCharacterByName(this.inputValue).subscribe((result) => {
      console.log(result);
      if (result.data.count > 0) {
        this.showSearchResult = true;
        this.searchedCharacter = result.data.results;
      }
      else {

        this.ngOnInit();
      }
    })
  }





}
