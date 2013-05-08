PDI.DBHandler = function() {
	
	var dbName = 'DB_PDI';
	var dbVersion = '1.0';
	var dbDisplayName = 'ParkDerIlm DB';
	var dbSizeInBytes = 10000;
	
	
	var CheckIfTableExists = function() {
		
	}
	
	
	var GetDB = function(){
		
		return window.openDatabase( dbName, dbVersion, dbDisplayName, dbSizeInBytes );
		
	};
	
}();