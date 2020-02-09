import React, {Component} from 'react';
import {Table, Button} from 'antd';

class MainTable extends Component {
  state = {
    pagination: { defaultCurrent: 1, pageSize: 4, total: 4},
    filter: [],
  }

  componentDidMount = () => {
    this.props.getData();
  }

  showDetailedInformation = (record, rowIndex) => {
    const {history} = this.props;
    history.push(`details/${record.id}`);
  }
  
  handleTableChange  = (pagination, filters, sorter, extra) =>  {
    console.log('params', pagination, filters, sorter, extra);
    this.setState(prevSate => ({
      ...prevSate,
      pagination: {
        ...this.state.pagination,
        defaultCurrent: pagination.current,
        pageSize: pagination.pageSize,
      },
    }));
  }

  handleAdd = () => {
    const {history: {push}} = this.props;
    push('/add')
  }

  render(){
    const {pagination} = this.state;
    const {loading} = this.props;

    return (
      <>
        <Button type="primary" onClick={this.handleAdd}>Add</Button>
        <Table 
          dataSource={this.props.data} 
          columns={this.columns} 
          rowKey={record => record.id}
          onChange={this.handleTableChange}
          loading={loading}
          pagination={{ ...pagination }}
          className="main-table"
        />
      </>
    )
  }
}

export default MainTable;