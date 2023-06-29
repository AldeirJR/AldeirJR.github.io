import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { MarvelAPIService } from '../Service/marvel-api.service';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var window: any;

@Component({
  selector: 'app-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.css']
})
export class AllCharactersComponent implements OnInit {
 
  
  constructor(private service: MarvelAPIService, private modalService: NgbModal) {   }
  
  Students: any;
  allStudents: number = 0;
  pagination: number = 1;

  allCharacters: any = [];
  comics: any = [];
  series: any = [];
  showSearchResult: boolean = false;
  showComicsDiv: boolean = false;
  showSeriesDiv: boolean = false;
  characterName: any;
  searchedCharacter: any = [];
  closeResult: string = '';
  modalcomics:any;
  modalseries:any;
  inputValue:string ='';

  ngOnInit(): void {
    this.showSearchResult = false;
    this.showComicsDiv = false;
    this.showSeriesDiv = false;
    this.modalcomics = new window.bootstrap.Modal(
      document.getElementById('modalComics')
    );

    this.modalseries = new window.bootstrap.Modal(
      document.getElementById('modalSeries')
    );

    this.service.allCharacters().subscribe((result) => {


      this.allCharacters = result.data.results;


    });

  //  this.fetchCharacters();

  }
  findCharacter(event: any) {
    this.characterName = this.inputValue;
    console.log(this.characterName);
    this.service.getCharacterByName(this.characterName).subscribe((result) => {
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

  fetchComicsByCharacter(characterId: string) {
    console.log(characterId);
    this.service.getComicsByCharacter(characterId).subscribe((result) => {


      if (result.data.count > 0) {
        this.comics = result.data.results;
        this.openComicsModal()
        this.showComicsDiv = true;
        
       
      }
    })
  }

  fetchSeriesByCharacter(characterId: string) {

    this.service.getSeriesByCharacter(characterId).subscribe((result) => {


      if (result.data.count > 0) {
        this.series = result.data.results;
        this.openSeriesModal();
        this.showSeriesDiv = true;
      }
    })
  }


  closeComicsModal() {
    this.modalcomics.hide();

}

closeSeriesModal() {
  this.modalseries.hide();

}

openComicsModal() {
  this.modalcomics.show();
}

openSeriesModal() {
  this.modalseries.show();
}


fetchCharacters() {
  this.service.getCharacters(this.pagination).subscribe((res: any) => {
    this.showSearchResult = true;
    this.searchedCharacter =res.data.results
    console.log(res.total);
  });
}
renderPage(event: number) {
  this.pagination = event;
  this.allCharacters();
}



}

