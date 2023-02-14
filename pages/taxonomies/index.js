

const TaxonomiesPage = () => {


    const taxoList = [
        {
            name:"taxo occ 1",
            category: "occupations"
        },
        {
            name:"taxo occ 2",
            category: "occupations"
        },
        {
            name:"taxo occ 3",
            category: "occupations"
        },
        {
            name:"taxo dom 1",
            category: "domains"
        },
        {
            name:"taxo dom 2",
            category: "domains"
        },
        {
            name:"taxo ab 1",
            category: "abilities"
        },
    ]

    const occList = taxoList.filter( (taxo) =>{
        return taxo.category != undefined && taxo.category == 'occupations'
    });
    const domainList = taxoList.filter( (taxo) =>{
        return taxo.category != undefined && taxo.category == 'domains'
    });
    const abilityList = taxoList.filter( (taxo) =>{
        return taxo.category != undefined && taxo.category == 'abilities'
    });

    const tableOutOfList = (list) => {
        if(list == undefined || list.length == 0)
            return (
                <table>Liste introuvable</table>
            )

        return (
            <table className="table thead-dark">
                <thead>
                    <tr>
                        <th>
                            <a href={`/taxonomies/${list[0].category}`}>
                                {list[0].category}
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map( (elem) => 
                            <tr>
                                <td href={"/taxonomies/"+elem.category+"/"+elem.slug}>
                                    {elem.name}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        )

    }

    return (
        <div>
            Les différentes catégories de taxonomies disponible :
            <table className="table">
                <tbody>
                    <tr>
                        <th>
                            {
                                tableOutOfList(occList)
                            }
                        </th>
                        <th>
                            {
                                tableOutOfList(domainList)
                            }
                        </th>
                        <th>
                            {
                                tableOutOfList(abilityList)
                            }
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TaxonomiesPage