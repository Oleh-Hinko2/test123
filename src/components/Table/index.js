import React, {Component} from 'react';
import {Table, Button, Input} from 'antd';

const { Search } = Input;


class MainTable extends Component {
  state = {
    pagination: { defaultCurrent: 1, pageSize: 10},
  }

  componentDidMount = () => {
    this.props.getData();
  }

  handleSearch = (value) => {
    const {data, setData} = this.props;
    const prevValue = value;
    this.setState(prevState => ({
      ...prevState,
      prevSearchValue: value
    }))
    const filterData = data.filter(item => prevValue.toLowerCase().split(' ').
                        every(v => item.name.toLowerCase().includes(v)))
        setData(filterData)
  }
  
  handleTableChange  = (pagination, filters, sorter, extra) =>  {
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
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button type="primary" onClick={this.handleAdd}>Add</Button>
            <Search
              placeholder="Search by user name"
              onSearch={value => this.handleSearch(value)}
              style={{ width: 200 }}
            />
          </div>
          <Table 
            dataSource={!this.props.searchData.length ? this.props.data : this.props.searchData} 
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