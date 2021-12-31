import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { EditorService } from 'src/app/services/editor.service.js';

import * as CanvasJS from '../../../../assets/js/canvasjs.min.js';

export interface graphDataFromServer {
  xdata?:Date;
  ydata?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  serverData?:graphDataFromServer[];
  panelOpenState = false;

  addForm = this.fb.group({
    ieDate: ['', Validators.required],
    ieAmt: ['', Validators.required],
    ieDesc: ['', Validators.required],
  });

  constructor(private editorService:EditorService, private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.editorService.getGraphData().subscribe((resp:any) => {
      console.log("graph response : " + JSON.stringify(resp));
      this.serverData = resp;

      let dataPoints = [];
      let dpsLength = 0;
      
      let chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        title:{
          text:"Expences"
        },
        axisX: {
          labelFormatter: function (e) {
            return CanvasJS.formatDate( e.value, "DD MMM");
          },
          title: "Date"
        },
        axisY: {
          title: "Amount", 
        },
        
        data: [{
          type: "spline",
          name: "First Quarter",
          showInLegend: true,
          dataPoints : dataPoints,
        }]
      });
      
      //dataPoints.push({x: 1, y: 23}, {x: 2, y: 28});
      for(var val of this.serverData)
      {
        console.log(new Date(val.xdata));
        dataPoints.push({x: new Date(val.xdata), y: val.ydata});
      }
      dpsLength = dataPoints.length;
      chart.render();
    });
  }


  addExpence(){
    console.log('Thanks! ' + JSON.stringify(this.addForm.value));
    this.editorService.addExpence(this.addForm.value).subscribe((resp) =>{
      console.log("response for add expence " + resp);
      //this.router.navigate(['editor', 'dashboard']);
    });
  }

}
