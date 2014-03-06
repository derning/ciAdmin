<?php
define('CACHE_DIR_NUM', 20000); // 缓存目录数量，根据预期缓存文件数调整，开根号即可
/**
 * 基础缓存类接口
 */
class CacheServer{
	var $_options = null;
	public function __construct($options = NULL){
		$this->_options = $options;
	}
	/**
	 * 获取缓存
	 */
	function &get($key){}
	/**
	 * 设置缓存
	 * @param string $key
	 * @param array $data
	 */
	function &set($key,$value,$ttl=0){}
	
	/**
	 * 清空所有缓存
	 */
	function &clear(){}
	/**
	 * 删除缓存
	 * @param string $key
	 */
	function &delete($key){}
}
/**
 * 普通php文件缓存
 * @author dongyaungong
 *
 */
class PhpCacheServer extends CacheServer{
	var $_cache_dir = './';
	function get($key){
		$cache_file = $this->_get_cahe_path($key);
		if (!$cache_file){
			return false;
		}
		$data = include($cache_file);
		return $data;
	}
	
	function &set($key, $value,$ttl=0){
		if (!$key) {
			return false;
		}
		$cache_file = $this->_get_cahe_path($key);
		$cache_data = "<?php \r\n/**\r\n* @Create by dongyg PhpCacheSever \r\n * @Time:".date("Y-m-d H:i:s")."\r\n */";
		$cache_data .= $this->_get_expire_condition($ttl);
		$cache_data .= "\r\nreturn ".var_export($value,true).";\r\n";
		$cache_data .="\r\n?>";
		return file_put_contents($cache_file, $cache_data, LOCK_EX);
	}
	function delete($key){
		$cache_file = $this->_get_cahe_path($key);
		unlink($cache_file);
	}
	function set_cache_dir($path){
		$this->_cache_dir = $path;
	}
	/**
	 * 获取文件
	 * @param  $key
	 * @return string
	 */
	function _get_cahe_path($key){
		$dir = str_pad(abs(crc32($key)) % CACHE_DIR_NUM,4,'0',STR_PAD_LEFT);
		$file_dir = $this->_cache_dir.'/'.$dir;
		if(!is_dir($file_dir)){
			mkdir($file_dir,0755,true);
		}
		return $file_dir.'/'.$this->_get_file_name($key);
	}
	
	public function _get_file_name($key){
		return md5($key).'.cache.php';
	}
	
	function _get_expire_condition($ttl=0){
		if (!$ttl) {
			$ttl = CACHE_TIME;
		}	
		return "\r\n\r\n" . 'if(filemtime(__FILE__) + ' . $ttl . ' < time())return false;' . "\r\n";
	}
	function __destruct(){}
}

class MemcacheServer extends CacheServer{
	var $_memcache = null;
	public function __construct($options){
		$this->MemcacheServer($options);
	}
	/**
	 * memcahce 构造哈数
	 * @param  $options
	 */
	public function MemcacheServer($options){
		parent::__construct($options);
		$this->connect($this->_options);
	}
	/**
	 * 连接memcache
	 * @param  $options
	 * @return boolean
	 */
	function connect($options){
		if (empty($options)) {
			return false;
		}
		$this->_memcache = new Memcache;
	    return $this->_memcache->connect($options['host'],$options['port']);
	}
	/**
	 * 获取memcace缓存
	 * @see CacheServer::get()
	 */
	function get($key){
		return $this->_memcache->get($key);
	}
	/**
	 * 设置memcache缓存
	 * @see CacheServer::set()
	 */
	function set($key, $value,$ttl=0){
		if (!$ttl) {
			$ttl = CACHE_TIME;;
		}
		return $this->_memcache->set($key, $value,MEMCACHE_COMPRESSED,$ttl);
	}
	/**
	 * 删除memcache缓存
	 * @see CacheServer::delete()
	 */
	function delete($key){
		return $this->_memcache->delete($key);
	}
	/**
	 * 清空memcahce所有缓存
	 * @see CacheServer::clear()
	 */
	function clear(){
		$this->_memcache->flush();
	}
	
	function __destruct(){
		$this->_memcache->close();
	}
}