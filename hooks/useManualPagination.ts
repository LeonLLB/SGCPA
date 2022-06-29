import { useState } from 'react'

const calcPaginationRange = (PaginationRange:number[],maxPages: number) : number[] => {
    let fixedPaginationRange = PaginationRange;

    if(PaginationRange.length > maxPages){
        fixedPaginationRange = fixedPaginationRange.filter(val => val<=maxPages)
    }

    return fixedPaginationRange
}

const calcPages = (posts,PostsPerPage) : number => {
    let pages = parseInt((posts / PostsPerPage).toString())

    if((posts % PostsPerPage) > 0) pages+=1;

    return pages;
}

const calcPage = (pageNum , pages) : number => {
    let page = pageNum

    if(pageNum > pages) page = 1;

    return page
}

const usePaginate = (initalPaginationRange: number[], maxPosts: number, posts: number,items:any[]): any[] =>{
    const [pages,setPages] = useState(calcPages(posts,maxPosts))
    const [pageNum, setPageNum] = useState(calcPage(1,pages))
    const [PaginationRange, setPaginationRange] = useState(calcPaginationRange(initalPaginationRange,pages))
    
    const changeItems = () :any[] => {
        const newItemRange = [
            maxPosts * (pageNum-1),
            (maxPosts * pageNum) - 1
        ]
        
        let values=[];

        for (let i = newItemRange[0]; i <= newItemRange[1] ; i++) {
            if(items[i] === undefined || items[i] === null) break; 
            values.push(items[i])
        }
        
        return values
    }

    const changePage = (newPageNum: number) : void => {
        const newPage = calcPage(newPageNum,pages)
        setPageNum(newPage);
    }
    
    const changePagination = (pageNum: number,PaginationRange: number[],maxPages: number,isFinal = true) : number[] => {

        const middleOfPaginationRange :number = ((PaginationRange.length - 1)/2);
        const shouldIncreaseByOne :boolean = (((PaginationRange.length - 1)%2)>0);

        let centralIndex = parseInt(middleOfPaginationRange.toString());

        if(shouldIncreaseByOne) centralIndex +=1;

        let newRange:number[];

        const isFinalRange = PaginationRange.includes(maxPages);

        if(pageNum === PaginationRange[centralIndex+1] && isFinalRange == false){
            newRange = PaginationRange.map(val=>val+1);
        }
        else if(pageNum === PaginationRange[0] && pageNum != 1){
            newRange = PaginationRange.map(val=>val-1);
        }
        else if(pageNum > PaginationRange[centralIndex+1] && isFinalRange == false){
            const prevRange = PaginationRange.map(val=>val+1);
            newRange = changePagination(pageNum,prevRange,maxPages,false);
        }
        else{
            newRange = PaginationRange
        }
        if(isFinal){
            setPaginationRange(newRange)
        }
        return newRange;
    }

    return [pageNum,pages, PaginationRange, changePagination,changePage,changeItems]

}

export default usePaginate;