import React from 'react'
import { connect } from 'react-redux';
import { getAllEmps, removeEmp } from '../../redux/Emp'
import Table from '../../components/Table';
import { Button } from 'antd';

class Emps extends Table {
  handleEdit = (record) => {
    const {history: {push}} = this.props;
    push(`/edit/${record.id}`)
  }
  
  handleDelete = (record) => {
    const {removeEmp} = this.props;
    removeEmp(record.id)
  }


  columns = [
    {
      title: 'Emp ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Emp name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Emp Active',
      dataIndex: 'active',
      key: 'active',
      render: text => 
        text ? "Active" : "Blocked"
    },
    {
      title: 'Emp department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: "actions",
      key: 'actions',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => this.handleEdit(record)}>Edit</Button>
          <Button type="primary" onClick={() => this.handleDelete(record)}>Delete</Button>
        </>
      )
    }
  ];

}

const mapStateToProps = ({emp}) => ({
  ...emp,
});

const mapDispatchToProps = {
  getData: getAllEmps,
  removeEmp
};

export default connect(mapStateToProps, mapDispatchToProps)(Emps);