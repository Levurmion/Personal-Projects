# Automaton

This module is a Typescript implementation of the LALR(1) automaton where states with identical core item sets are merged. The `DFAStates` generated by the `Automaton` class can be used to generate **SLR(1)** and **LALR(1)** parsing tables.