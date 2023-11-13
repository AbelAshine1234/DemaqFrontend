import "../css/app.css";
import {DataTable} from "primereact/DataTable";
import {Column} from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { useState } from "react";
import {FilterMatchMode} from "primereact/api";
import {InputText} from "primereact/inputtext";



export default function FileManagement() {

  const[filters, setFilters] = useState({
    global:{value: null, matchMode: FilterMatchMode.CONTAINS}
  })

  const data = [
    {
      status:"null",
      date:"11/07/2009",
      duration:"00:10:56",
      user:"English",
      correspondence:"AM",
      title:"Yahoo",
      rtb:"yes",
    },

    {
      status:"null",
      date:"02/07/2009",
      duration:"00:05:56",
      user:"English",
      correspondence:"AM",
      title:"Gmail",
      rtb:"yes",
    },

    {
      status:"null",
      date:"05/07/2009",
      duration:"01:10:56",
      user:"English",
      correspondence:"AM",
      title:"Yahoo",
      rtb:"yes",
    },

    
  ];


  return (
    <div>

      <InputText
      onInput={(e) => 
        setFilters({
          global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
      })
      }
      />

      <DataTable value = {data} sortMode="multiple" filters={filters}
      paginator
      rows={1}
      rowsPerPageOptions={[1,2,3]}
      totalRecords={3}
      >
        <Column field = "status" header = "Status" sortable/>
        <Column field = "date" header = "Date" sortable/>
        <Column field = "duration" header = "Duration" sortable/>
        <Column field = "user" header = "User" sortable/>
        <Column field = "correspondence" header = "Correspondence" sortable/>
        <Column field = "title" header = "title" sortable/>
        <Column field = "rtb" header = "RTB" sortable/>
      </DataTable>
    </div>
  )
}

