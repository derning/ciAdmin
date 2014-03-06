<?php
/**
 * 封装一些公用的mod方法，方便对数据库的操作
 * @author dongyaungong
 *
 */
class Base_mod extends CI_Model{
	private $cache;
	public function __construct($tbl=''){
		parent::__construct();
		$this->load->database();
		$this->db->cache_off();
		$this->tableName = $tbl;
		$this->cache = $this->cache_server();
	}
/**
     * 根据主键检索
     * 
     * @param string $pk
     * @param array $where 附加查询条件
     * @return array 返回一维数组，未找到记录则返回空数组
     */
    public function getInfo($pk, $fields='id')
    {
        $where[$fields] = $pk;
        $query = $this->db->from($this->tableName)->where($where)->get();
        return $query->row_array();
    }
	/**
	 * 根据条件获取单条记录
	 * @param array $where
	 */
	public function getRow($where){
		$query = $this->db->from($this->tableName)->where($where)->limit(1)->get();
		return $query->row_array();
	}
	/**
	 * 获取所有数据
	 * @param array $query
	 */
	public function getData($query){
		$this->db->from($this->tableName);
		if($query['where']){
			$this->db->where($query['where']);
		}
		$order_by = $query['order_by'];
		if(NULL != $order_by){
			if(is_array($order_by)){
				foreach($order_by as $value){
					$this->db->order_by($value, '', false);
				}
			} else {
				$this->db->order_by($order_by);
			}
		}
		$limit = $query['limit'];
		if($limit){
			$this->db->limit($limit);
		}
		$query = $this->db->get();
		return $query->result_array();
	}
	/**
	 * 统计满足条件的总数
	 *
	 * @param array $where 统计条件
	 * @return int 返回记录条数
	 */
	public function count($where = array())
	{
		return $this->db->from($this->tableName)->where($where)->count_all_results();
	}
	/**
	 * 添加数据
	 * array  data
	 */
	public function doInsert($data){
		$res = $this->db->insert($this->tableName, $data);
		return $res;
	}
	/**
	 * 根据编号修改内容
	 * @param unknown $id
	 * @param unknown $data
	 */
	public function doEdit($id,$data){
		$where['id'] = $id;
        return $this->updateAll($data, $where);
	}
	/**
	 * 更新表记录
	 *
	 * @param array $attributes
	 * @param array $where
	 * @return bollean true更新成功 false更新失败
	 */
	public function updateAll($attributes, $where = array())
	{
		return $this->db->where($where)->update($this->tableName, $attributes);
	}
	/**
	 * 删除记录
	 *
	 * @param array $where 删除条件
	 * @param int $limit 删除行数
	 * @return boolean true删除成功 false删除失败
	 */
	public function deleteAll($where = array(), $limit = NULL)
	{
		return $this->db->delete($this->tableName, $where, $limit);
	}
	/**
	 * 根据编号删除信息
	 * @param int $id
	 */
	public function deleteInfo($id){
		$where['id'] = $id;
		return $this->db->delete($this->tableName,$where);
	}
	
	/**********************缓存相关方法****************/
	public function getCache($key,$act='',$param=''){
		$result = $this->cache->get($key);
		if (!$result) {
			if ($act!='') {
				$result = $this->resetCache($key,$act,$param);
			}
		}
		return $result;
	}
	
	public function set($key,$value,$ttl=86400){
		$this->cache->set($key,$value,$ttl);
	}
	public function deleteKey($key){
		$this->cache->delete($key);
	}
	public function resetCache($key,$act,$param){
		$this->deleteKey($key);
		$act = "_cache".ucfirst($act);
		$data = $this->$act($param);
		$this->set($key, $data);
		return $data;
	}
	/**
	 * 设置缓存
	 */
	private function cache_server(){
		include_once (FCPATH.APPPATH .'libraries/cache.php');
		static $CS = null;
		if ($CS == null) {
			switch (Cache_SERVER){
				case 'memcached':
					$CS = new MemcacheServer(array('host'=>CACHE_HOST,'port'=>CACHE_PORT,));
					break;
				case 'default':
					$CS = new PhpCacheServer();
					$CS->set_cache_dir(TEMP."/caches");
			}
		}
		return $CS;
	}
}