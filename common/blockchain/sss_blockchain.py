import random


def poly(s,n,k):
    l=[s]
    print("The equation is")
    print("y","=",s,end=" ")
    for i in range(k-1):
        l.append(int(random.random()*1000)+1)
        print("+",l[i],"x^",i+1,end=" ")
    print("\n")
    val=[]
    for i in range(n):
        val.append([i,0])
        for j in range(k):
            val[i][1]+=(l[j]*(i**j))
        print(val[i])
    print("choose ",k," sequences for determining the Secret number(mention x values as list)")
    x=eval(input())
    sum=0
    for i in x:
        y=val[i][1]
        dr=1
        nr=1
        for j in x:
            if i!=j:
                dr*=(val[i][0]-val[j][0])
                nr*=(-val[j][0])
        sum+=((nr/dr)*y)
    print("secret number is",sum)



s=int(input("Enter the secret number"))
n=int(input("Enter number of shares"))
k=int(input("enter threshold number of shares required"))
poly(s,n,k);


