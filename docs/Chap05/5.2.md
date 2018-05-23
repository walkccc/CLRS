## 5.2-1

> In $\text{HIRE-ASSISTANT}$, assuming that the candidates are presented in a random order, what is the probability that you hire exactly one time? What is the probability you hire exactly $n$ times?

Since $\text{HIRE-ASSISTANT}$ always hires candidate 1, it hires exactly once if and only if no candidates other than candidate 1 are hired. This event occurs when candidate 1 is the best candidate of the $n$, which occurs with probability $1 / n$.

$\text{HIRE-ASSISTANT}$ hires $n$ times if each candidate is better than all those who were interviewed (and hired) before. This event occurs precisely when the list of ranks given to the algorithm is $\langle 1, 2, \ldots, n \rangle$, which occurs with probability $1 / n!$.

## 5.2-2

> In $\text{HIRE-ASSISTANT}$, assuming that the candidates are presented in a random order, what is the probability that you hire exactly twice?

We make three obervations:

1. Candidate 1 is always hired.
2. The best candidate, i.e., the one whose rank is $n$, is always hired.
3. If the best candidate is candidate 1, then that is the only candidate hired.

Therefore, in order for $\text{HIRE-ASSISTANT}$ to hire exactly twice, candidate 1 must have rank $i \le n - 1$ and all candidates whose ranks are $i + 1, i + 2, \ldots, n - 1$ must be interviewed after the candidate whose rank is $n$. (When $i = n - 1$, this second condition vacuously holds.)

Let $E_i$ be the event in which candidate 1 has rank $i$; clearly, $\Pr\\{E_i\\} = 1 / n$ for any given value of $i$.

Letting $j$ denote the position in the interview order of the best candidate, let $F$ be the event in which candidates $2, 3, \ldots, j - 1$ have ranks strictly less than the rank of candidate 1. Given that event $E_i$ has occurred, event $F$ occurs when the best candidate is the first one interviewed out of the $n - i$ candidates whose ranks are $i + 1, i + 2, \ldots, n$. Thus, $\Pr\\{F \mid E_i\\} = 1 / (n - i)$.

Our final event is $A$, which occurs when $\text{HIRE-ASSISTANT}$ hires exactly twice. Noting that the events $E_1, E_2, \ldots, E_n$ are disjoint, we have

\begin{align}
A & = F \cap (E_1 \cup E_2 \cup \cdots \cup E_{n - 1}) \\\\
  & = (F \cap E_1) \cup (F \cap E_2) \cup \cdots \cup (F \cap E_{n - 1}).
\end{align}

and

$$\Pr\\{A\\} = \sum_{i = 1}^{n - 1}\Pr\\{F \cap E_i\\}.$$

By equation $\text{(C.14)}$,

\begin{align}
\Pr\\{F \cap E_i\\} & = \Pr\\{F | E_i\\}\Pr\\{E_i\\} \\\\
                  & = \frac{1}{n - i} \cdot \frac{1}{n},
\end{align}

and so

\begin{align}
\Pr\\{A\\} & = \sum_{i = 1}^{n - 1} \frac{1}{n - i} \cdot \frac{1}{n} \\\\
         & = \frac{1}{n} \sum_{i = 1}^{n - 1} \frac{1}{n - i} \\\\
         & = \frac{1}{n} \Big(\frac{1}{n - 1} + \frac{1}{n - 2} + \cdots + \frac{1}{1}\Big) \\\\
         & = \frac{1}{n} \cdot H_{n - 1},
\end{align}

where $H_{n - 1}$ is the $n$th harmonic number.

## 5.2-3

> Use indicator random variables to compute the expected value of the sum of $n$ dice.

Expectation of a single dice $X_i$ is

\begin{align}
\text E[X_k] & = \sum_{i = 1}^6 i \Pr\\{X_k = i\\} \\\\
             & = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} \\\\
             & = \frac{21}{6} \\\\
             & = 3.5.
\end{align}

As for multiple dices,

\begin{align}
\text E[X] & = \text E\Bigg[\sum_{i = 1}^n X_i \Bigg] \\\\
           & = \sum_{i = 1}^n \text E[X_i] \\\\
           & = \sum_{i = 1}^n 3.5 \\\\
           & = 3.5 \cdot n.
\end{align}

## 5.2-4

> Use indicator random variables to solve the following problem, which is known as the ***hat-check problem***. Each of $n$ customers gives a hat to a hat-check person at a restaurant. The hat-check person gives the hats back to the customers in a random order. What is the expected number of customers who get back their hat?

Another way to think of the hat-check problem is that we want to determine the expected number of fixed points in a random permutation. (A ***fixed point*** of a permutation $\pi$ is a value $i$ for which $\pi(i) = i$.) We could enumerate all $n!$ permutations, count the total number of fixed points, and divide by $n!$ to determine the average number of fixed points per permutation. This would be a painstaking process, and the answer would turn out to be $1$. We can use indicator random variables, however, to arrive at the same answer much more easily.

Define a random variable $X$ that equals the number of customers that get back their own hat, so that we want to compute $\text E[X]$.

For $i = 1, 2, \ldots, n$, define the indicator random variable

$$X_i = I\\{\text{customer $i$ gets back his own hat}\\}.$$

Then $X = X_1 + X_2 + \cdots + X_n$.

Since the ordering of hats is random, each customer has a probability of $1 / n$ of getting back his or her own hat. In other words, $\Pr\\{X_i = 1\\} = 1 / n$, which, by Lemma 5.1, implies that $\text E[X_i] = 1 / n$.

Thus,

\begin{align}
\text E[X] & = \text E \Bigg[ \sum_{i = 1}^n X_i \Bigg] \\\\
           & = \sum_{i = 1}^n \text E[X_i] & \text{(linearity of expectation)} \\\\
           & = \sum_{i = 1}^n 1 / n \\\\
           & =  1,
\end{align}

and so we expect that exactly 1 customer gets back his own hat.

Note that this is a situation in which the indicator random variables are not independent. For example, if $n = 2$ and $X_1 = 1$, then $X_2$ must also equal $1$. Conversely, if $n = 2$ and $X_1 = 0$, then $X_2$ must also equal $0$. Despite the dependence, $\Pr\\{X_i = 1\\} = 1 / n$ for all $i$, and linearity of expectation holds. Thus, we can use the technique of indicator random variables even in the presence of dependence.

## 5.2-5

> Let $A[1..n]$ be an array of $n$ distinct numbers. If $i < j$ and $A[i] > A[j]$, then the pair $(i, j)$ is called an ***inversion*** of $A$. (See Problem 2-4 for more on inversions.) Suppose that the elements of $A$ form a uniform random permutation of $\langle 1, 2, \ldots, n \rangle$. Use indicator random variables to compute the expected number of inversions.

Let $X_{ij}$ be an indicator random variable for the event where the pair $A[i]$, $A[j]$ for $i < j$ is inverted, i.e., $A[i] > A[j]$. More precisely, we define $X_{ij} = I\\{A[i] > A[j]\\}$ for $1 \le i < j \le n$. We have $\Pr\\{X_{ij} = 1\\} = 1 / 2$, because given two distinct random numbers, the probability that the first is bigger than the second is $1 / 2$. By Lemma 5.1, $E[X_{ij}] = 1 / 2$.

Let $X$ be the the random variable denoting the total number of inverted pairs in the array, so that

$$X = \sum_{i = 1}^{n - 1} \sum_{j = i + 1}^n X_{ij}.$$

We want the expected number of inverted pairs, so we take the expectation of both sides of the above equation to obtain

$$\text E[X] = \text E \Bigg[\sum_{i = 1}^{n - 1} \sum_{j = i + 1}^n X_{ij} \Bigg].$$

We use linearity of expectation to get

\begin{align}
\text E[X] & = \text E \Bigg[\sum_{i = 1}^{n - 1}\sum_{j = i + 1}^n X_{ij} \Bigg] \\\\
           & = \sum_{i = 1}^{n - 1}\sum_{j = i + 1}^n \text E[X_{ij}] \\\\
           & = \sum_{i = 1}^{n - 1}\sum_{j = i + 1}^n 1 / 2 \\\\
           & = \binom{n}{2}\frac{1}{2} \\\\
           & = \frac{n(n - 1)}{2} \cdot \frac{1}{2} \\\\
           & = \frac{n(n - 1)}{4}.
\end{align}

Thus the expected number of inverted pairs is $n(n - 1) / 4$.
