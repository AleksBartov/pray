import { MY_KEY } from "../CONSTANTS";

export const greatData = async ( { username, navigation, setBtnPressed, setUsername, setPassword } ) => {

        fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${username}?${MY_KEY}`)
        .then(data => data.json())
        .then(allNamesArr => {
        let GROUPS = new Set();
        let length = 0;
        allNamesArr.forEach(person=>person.group.forEach(g=>GROUPS.add(g)));
        let structuredArray = [...GROUPS]
            .sort()  // here we can sort groups
            .map(group=>{
            return (
                {
                title: group,
                data: []
                }
            )
            });

            allNamesArr
            .forEach(person => {
            length++;
            if(GROUPS.has(person.group[0])) {
                structuredArray.forEach(obj=>{
                if(obj.title === person.group[0]) {
                    obj.data.push(person);
                };
                })
            }
            });

        let oZdraviiAll = structuredArray
        .reduce((result, group ) => {
            const newData = group.data.filter(p => p.live === 'о здравии');
            return [...result, { ...group, data: newData }];
        }, []);

        let oUpokoeniiAll = structuredArray
        .reduce((result, group ) => {
            const newData = group.data.filter(p => p.live === 'о упокоении');
            return [...result, { ...group, data: newData }];
        }, []);

        let toHomeData = [ username, structuredArray];
        setBtnPressed(false);
        setUsername(null);
        setPassword(null);
        navigation.navigate('Home', { toHomeData });
    });
}