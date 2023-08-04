import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LearningMaterialService {

  learningMaterialUrl = this.config.getConfig().learning_material;
  categoriesUrl = this.config.getConfig().categories;

  constructor(private http: HttpClient,
    private router: Router,
    private config: ConfigService,) { }

    listLearningMaterial(params) {
      return this.http.get<any>(this.learningMaterialUrl.list,{
          params
      })
    }

    getLearningMaterial(id): Observable<any>{
      return this.http.get(this.learningMaterialUrl.get.replace(':id', id));
    }

    createLearningMaterial(params): Observable<any>{
      return this.http.post(this.learningMaterialUrl.create, params, {
        reportProgress: true,
        observe: 'events'
      });
    }

    updateLearningMaterial(id, params): Observable<any>{
      return this.http.patch(this.learningMaterialUrl.update.replace(':id', id), params);
    }

    deleteLearningMaterial(id): Observable<any>{
      return this.http.delete(this.learningMaterialUrl.delete.replace(':id', id));
    }

    deleteLearningMaterialReal(id): Observable<any>{
      return this.http.delete(this.learningMaterialUrl.remove.replace(':id', id));
    }

    searchLearningMaterial(params): Observable<any>{
      return this.http.get<any>(this.learningMaterialUrl.search, {
        params
      })
    }

    listCategories(){
      return this.http.get<any>(this.categoriesUrl.list)
    }

    listPageLearningMaterial(params){
      return this.http.get<any>(this.learningMaterialUrl.list, {
        params
      })
    }
}
