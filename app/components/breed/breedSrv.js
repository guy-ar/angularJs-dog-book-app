app.factory("breedSrv", function($log, $http, $q) {

    let breedList = [];
    const PREFIX = "https://dog.ceo/api/breed/";
    const SUFFIX_IMG = "/images/random";
    const BREED_LIST_URL = "https://dog.ceo/api/breeds/list/all"

    function Breed(name, imageUrl){        
        this.name = name;
        this.image = imageUrl;        
    };

    function refreshBreeds(){
        for (let i = 0, len = breedList.length; i<len; i++)
        {
            updateBreedImage(breedList[i]);
        }
                
    }

    function getBreeds(){
        // initiate the data before getting it back from DB
        let breeds = [];
        breedList = [];
        let async = $q.defer();

        $http.get(BREED_LIST_URL).then(
            function (res){
                // on success
                let message = res.data.message;
                let breeds = Object.keys(message);                 
                
                for (let i = 0, len = breeds.length; i<len; i++)
                {
                    getBreedImage(breeds[i]);
                }
                $log.info(breedList);
                async.resolve(breedList);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                async.reject(err);
            });
        return async.promise;
    }
    function getBreedImage(breedName){
        let fullUrl = PREFIX + breedName + SUFFIX_IMG;
        let asyncInt = $q.defer();
        $http.get(fullUrl).then(
            function(resImg){
                $log.info("Breed Name:" + breedName);
                //let urlParams = resImg.data.message.split("/")
                
                let breed = new Breed(breedName, resImg.data.message);
                breedList.push(breed);
                asyncInt.resolve(breedList);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                asyncInt.reject(err);
            });
        return asyncInt.promise;
    }

    function updateBreedImage(breed){
        let fullUrl = PREFIX + breed.name + SUFFIX_IMG;
        let asyncInt = $q.defer();
        $http.get(fullUrl).then(
            function(resImg){
                $log.info("Breed Name:" + breed.name);
                //let urlParams = resImg.data.message.split("/")
                
                breed.image = resImg.data.message;
                asyncInt.resolve(breed);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                asyncInt.reject(err);
            });
        return asyncInt.promise;
    }

    function getImgForBreed(name) {
        
        let async = $q.defer();
        $http.get(PREFIX + name + "/images").then(
            function(res){
                                
                imageArr = res.data.message;
                async.resolve(imageArr);
            }, function(err) {
                // on error
                $log.error(err);
                // notify on error
                asyncInt.reject(err);
            });
        
        return async.promise;
    }

    return {
        getBreeds: getBreeds,
        refreshBreeds: refreshBreeds,
        getImgForBreed: getImgForBreed
    }
});