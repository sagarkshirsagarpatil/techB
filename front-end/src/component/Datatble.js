import React ,{useState,useEffect}from 'react';
import DataTable,{ defaultThemes } from 'react-data-table-component';
import delet from'../img/delete.svg';
import edi from'../img/edit.svg';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
const Datatable=() => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [Id,setId]=useState('');
  const [Cnumber,setCnumber]=useState('');
  const [Mnumber,setMnumber]=useState('');
  const  edit=(id)=>{
    setShow(true)
    fetch(`http://localhost:4000/edit?id=${id}`).then((response) => {
        return response.json();
    }).then((response) => {
  setId(response._id)
 setName(response.name);
 setAddress(response.address);
 setCnumber(response.customer);
 setMnumber(response.number);
    });
}
const submit=(e)=>{
  e.preventDefault();
  let dat={
    id:Id,
    name:name,
    address:address,
    number:Mnumber,
    customer:Cnumber
  }
  console.log(dat);
fetch(`http://localhost:4000/update`,{
method:'PUT',

  headers: {
    "Content-Type": "application/json",
  },
 body:JSON.stringify(dat)
}).then((resp)=>{
  fetchUsers();
});
}

const dele = (id) => {

  fetch(`http://localhost:4000/delet?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
      fetchUsers();
  })
  
};






  const fetchUsers = async (page) => {
    setLoading(true);

    const response = await axios.get(
                   ` http://localhost:4000/?page=${page}&per_page=${perPage}`,{ headers: {
                    'Content-Type': 'application/json'
                }}
    );

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    const response = await axios.get(
                    `http://localhost:4000/?page=${page}&per_page=${newPerPage}`,{ headers: {
                                        'Content-Type': 'application/json'
                                    }}
    );

    setData(response.data.data);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, []);
  let columns = [
                    {
                      name: "Name",
                      sortable: true,
                      selector: (row) => row.name,
                    },
                    {
                      name: "Address",
                      selector: (row) => row.address,
                    },
                    {
                      name:"Customer Number",
                      selector: (row) => row.customer,
                    },
                    {
                      name: "Meter Number",
                      selector: (row) => row.number,
                      sortable: true,
                    },
                    {
                      name: "action",
                      selector: (row) => (
                        <div>
                        <img src={edi} width='20px' onClick={()=>{edit(row._id)}}  className="me-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
                        <img src={delet} onClick={()=>{dele(row._id)}} />
                         </div>
                      ),
                    },
                  ];

const customStyles = {
	header: {
		style: {
			minHeight: '56px',
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
};

  return (
    <div className="p-5 border text-start">
    <DataTable
      title="Customer List"
      columns={columns}
      data={data}
   fixedHeader
   fixedHeaderScrollHeight='400px'
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      actions={
        <Link to="/addcustomer" className='btn btn-primary'>Add Customer</Link>
      }
    />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer</Modal.Title>
        </Modal.Header>
        <form onSubmit={submit}>
        <Modal.Body>
            <div>
               <div>
                <input value={Id} onChange={(e)=>{setId(e.target.value)}} type='hidden'/>
                <label className='form-label'>Customer Name</label>
                <input className='form-control' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
               </div>
               <div className='mt-3'>
                <label className='form-label'>Customer Address</label>
                <input className='form-control' value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
               </div>
               <div className='mt-3'>
                <label className='form-label'>Customer Number</label>
                <input type="number" className='form-control' value={Cnumber} onChange={(e)=>{setCnumber(e.target.value)}} required/>
               </div>
               <div className='mt-3'>
                <label className='form-label'>Meter Number</label>
                <input type="number" className='form-control' value={Mnumber} onChange={(e)=>{setMnumber(e.target.value)}} required/>
               </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Update Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
export default Datatable;
