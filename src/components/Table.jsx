import {useState} from 'react';



export default function Dynamictable(){

    const [tableData, setTableData] = useState([]);

    const Table = () => {
        return (
        <table>
        <thead>
        <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {tableData.map((data) => (
        <tr key={data.id}>
        <td>{data.id}</td>
        <td>{data.name}</td>
        <td>{data.description}</td>
        </tr>
        ))}
        </tbody>
        </table>
        );
        };

        const addData = () => setTableData([...tableData, {id: 1, name: 'John', description: 'Lorem Ipsum'}]);

        
      
}


