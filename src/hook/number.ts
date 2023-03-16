const numberhander=(value:number)=>{
    let sum:string=''
    type Numbervalue={
        '0':string,
        '1':string,
        '2':string,
        '3':string,
        '4':string,
        '5':string,
        '6':string,
        '7':string,
        '8':string,
        '9':string
    }
    const numbervalue={
        '0':'十',
        '1':'一',
        '2':'二',
        '3':'三',
        '4':'四',
        '5':'五',
        '6':'六',
        '7':'七',
        '8':'八',
        '9':'九'
    }
    value.toString().split('').forEach((values)=>{
        sum+=numbervalue[values as keyof Numbervalue]
    })
    return sum
}
export {numberhander}